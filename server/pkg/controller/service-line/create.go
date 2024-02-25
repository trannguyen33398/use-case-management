package serviceLine

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/service-line/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateServiceLineRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.ServiceLine.Create(tx.DB(), &model.ServiceLines{
		Name:              input.Name,
		ParentId:          input.ParentId,
		Description:       input.Description,
		ResponsiblePerson: input.ResponsiblePerson,
		Active:            input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}
