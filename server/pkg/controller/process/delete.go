package process

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) error {
	tx, done := r.repo.NewTransaction()
	err := r.store.Process.Delete(tx.DB(), c.Param("processId"))

	if err != nil {
		return done(err)
	}
	return done(nil)
}
