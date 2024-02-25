package risk

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) ( error) {
	tx, done := r.repo.NewTransaction()
	 err := r.store.Risk.Delete(tx.DB(),c.Param("riskId") )


	
	 if err != nil {
		return done(err)
	}
	return done(nil)
}
