package serviceLine

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) error {
	tx, done := r.repo.NewTransaction()
	err := r.store.ServiceLine.Delete(tx.DB(), c.Param("serviceLineId"))

	if err != nil {
		return done(err)
	}
	return done(nil)
}
