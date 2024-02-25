package machine

import (


	"github.com/gin-gonic/gin"
	
)

func (r *controller) Delete(c *gin.Context) ( error) {
	tx, done := r.repo.NewTransaction()
	 err := r.store.Machine.Delete(tx.DB(),c.Param("machineId") )


	
	 if err != nil {
		return done(err)
	}
	return done(nil)
}
