package bundle

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/bundle/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Update(c *gin.Context, input request.CreateBundleRequest) error {
	tx, done := r.repo.NewTransaction()
	bundleId, err :=  model.UUIDFromString(c.Param("bundleId"))
	
	if err != nil {
		 return done(err)
	}
	useCases := make([]model.BundlesToUseCases,0)
	

	for _, v:= range input.UseCases{
		temp := model.BundlesToUseCases{
			UseCasesId: v,
			BundlesID: bundleId,
			BundlesType: "bundles",
		}
		
		useCases =append(useCases,temp)
	}

	

	err = r.store.Bundle.Update(tx.DB(), c.Param("bundleId"), &model.Bundles{
		Name:        input.Name,
		Description: input.Description,
		UseCases: useCases,
	})

	if err != nil {
		return done(err)
	}

	return done(nil)
}
