package sprint

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.Sprints, error) {
	sprint, err := r.store.Sprint.Detail(r.repo.DB(), c.Param("sprintId"))
	if err != nil {
		return nil, err
	}

	return sprint, nil
}
