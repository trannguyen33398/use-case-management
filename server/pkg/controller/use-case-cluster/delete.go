package useCaseCluster

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) error {
	tx, done := r.repo.NewTransaction()
	err := r.store.UseCaseCluster.Delete(tx.DB(), c.Param("useCaseClusterId"))

	if err != nil {
		return done(err)
	}
	return done(nil)
}
