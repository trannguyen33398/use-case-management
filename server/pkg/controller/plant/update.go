package plant

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/plant/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Update(c *gin.Context, input request.CreatePlantRequest) error {
	tx, done := r.repo.NewTransaction()
	// Create client
	err := r.store.Plant.Update(tx.DB(), c.Param("plantId"), &model.Plants{
		Name:              input.Name,
		ParentId:          input.ParentId,
		OperationsCluster: input.OperationsCluster,
		Type:              input.Type,
		NameAbbreviation:  input.NameAbbreviation,
		Segment:           input.Segment,
		Zebra:             input.Zebra,
		Active:            input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}
