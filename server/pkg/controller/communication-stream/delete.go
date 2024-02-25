package communicationStream

import (
	"github.com/gin-gonic/gin"
)

func (r *controller) Delete(c *gin.Context) ( error) {
	tx, done := r.repo.NewTransaction()
	 err := r.store.CommunicationStream.Delete(tx.DB(),c.Param("communicationStreamId") )


	
	 if err != nil {
		return done(err)
	}
	return done(nil)
}
