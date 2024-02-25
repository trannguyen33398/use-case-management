package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateCommunicationStreamResponse struct {
	Data *CommunicationStream `json:"data"`
}

type CommunicationStream struct {
	Id                string `json:"id"`
	Name              string `json:"name"`
	Description       string `json:"description"`
	ResponsiblePerson string `json:"responsiblePerson"`
	Active            *bool  `json:"active"`
	CreatedAt         string `json:"createdAt"`
	UpdatedAt         string `json:"updatedAt"`
}

func ToCommunicationStream(communicationStream *model.CommunicationStreams) *CommunicationStream {
	return &CommunicationStream{
		Id:                communicationStream.ID.String(),
		CreatedAt:         communicationStream.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:         communicationStream.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:              communicationStream.Name,
		Description:       communicationStream.Description,
		Active:            communicationStream.Active,
		ResponsiblePerson: communicationStream.ResponsiblePerson,
	}
}

func ToCommunicationStreams(communicationStreams []*model.CommunicationStreams) []CommunicationStream {
	rs := make([]CommunicationStream, 0, len(communicationStreams))
	for _, communicationStream := range communicationStreams {
		c := ToCommunicationStream(communicationStream)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
