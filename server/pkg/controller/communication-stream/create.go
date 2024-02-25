package communicationStream

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/communication-stream/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateCommunicationStreamRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.CommunicationStream.Create(tx.DB(), &model.CommunicationStreams{
		Name:              input.Name,
		Description:       input.Description,
		ResponsiblePerson: input.ResponsiblePerson,
		Active:            input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}
