package bundle

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) ( error) {
	tx, done := r.repo.NewTransaction()
	 err := r.store.Bundle.Delete(tx.DB(),c.Param("bundleId") )


	
	 if err != nil {
		return done(err)
	}
	return done(nil)
}
