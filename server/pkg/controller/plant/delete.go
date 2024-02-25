package plant

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) error {
	tx, done := r.repo.NewTransaction()
	err := r.store.Plant.Delete(tx.DB(), c.Param("plantId"))

	if err != nil {
		return done(err)
	}
	return done(nil)
}
