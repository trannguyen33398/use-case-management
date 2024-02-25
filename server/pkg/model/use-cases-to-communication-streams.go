package model

type UseCasesToCommunicationStreams struct {
	BaseModel
	UseCasesID UUID `json:"useCasesId"`
	UseCasesType string `json:"useCasesType"`
	CommunicationStreamId UUID `json:"communicationStreamId"`


	CommunicationStream *CommunicationStreams `json:"communicationStream" gorm:"foreignkey:CommunicationStreamId"`
}