package bundle

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/bundle/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateBundleRequest) error {
	tx, done := r.repo.NewTransaction()
	
	useCases := make([]model.BundlesToUseCases,0)

	for _, v:= range input.UseCases{
		temp := model.BundlesToUseCases{
			UseCasesId: v,
		}
		
		useCases =append(useCases,temp)
	}


	// Create client
	err := r.store.Bundle.Create(tx.DB(), &model.Bundles{
		Name:        input.Name,
		Description:    input.Description,
		UseCases: useCases,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}
