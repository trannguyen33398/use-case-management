package sprint

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) error {
	tx, done := r.repo.NewTransaction()
	err := r.store.Sprint.Delete(tx.DB(), c.Param("sprintId"))

	if err != nil {
		return done(err)
	}
	
	return done(nil)
}
