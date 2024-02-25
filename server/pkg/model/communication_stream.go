package model

type CommunicationStreams struct {
	BaseModel
	Name              string `json:"name"`
	Description       string `json:"description"`
	ResponsiblePerson string `json:"responsiblePerson"`
	Active            *bool   `json:"active"`
}


