package useCase

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.UseCases, error) {
	useCase, err := r.store.UseCase.Detail(r.repo.DB(), c.Param("useCaseId"))
	if err != nil {
		return nil, err
	}

	return useCase, nil
}
