package benefitCategory

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) ( error) {
	tx, done := r.repo.NewTransaction()
	 err := r.store.BenefitCategory.Delete(tx.DB(),c.Param("benefitCategoryId") )


	
	 if err != nil {
		return done(err)
	}
	return done(nil)
}
