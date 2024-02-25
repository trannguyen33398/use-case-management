package communicationStream

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.CommunicationStreams) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.CommunicationStreams, error)
	Detail(db *gorm.DB, id string) (*model.CommunicationStreams, error)
	Update(db *gorm.DB, id string, e *model.CommunicationStreams) error
	Delete(db *gorm.DB, id string) error
}
