package risk

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/view"
)

func (r *controller) List(c *gin.Context) (int64, []*model.Risks, error) {
	page, limit, err := view.GetPaginationFromRequest(c.Query("page"), c.Query("limit"))
	if err != nil {
		return 0, nil, err
	}
	total, risks, err := r.store.Risk.All(r.repo.DB(), c.Query("name"), page, limit)
	if err != nil {
		return 0, nil, err
	}

	return total, risks, nil
}
