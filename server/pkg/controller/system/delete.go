package system

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) ( error) {
	tx, done := r.repo.NewTransaction()
	 err := r.store.System.Delete(tx.DB(),c.Param("systemId") )


	
	 if err != nil {
		return done(err)
	}
	return done(nil)
}
