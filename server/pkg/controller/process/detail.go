package process

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.Processes, error) {
	process, err := r.store.Process.Detail(r.repo.DB(), c.Param("processId"))
	if err != nil {
		return nil, err
	}

	return process, nil
}
