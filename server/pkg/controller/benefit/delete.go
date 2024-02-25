package benefit

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) ( error) {
	tx, done := r.repo.NewTransaction()
	 err := r.store.Benefit.Delete(tx.DB(),c.Param("benefitId") )


	
	 if err != nil {
		return done(err)
	}
	return done(nil)
}
