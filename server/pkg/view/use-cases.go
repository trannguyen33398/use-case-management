package view

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateUseCasesResponse struct {
	Data *Plant `json:"data"`
}

type UseCasesMapping struct {
	Id          string      `json:"id"`
    Name        string      `json:"name"`
}



type UseCases struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	ParentId    *model.UUID `json:"parentId"`
	ParentName  string      `json:"parentName"`
	ProcessParentId    *model.UUID `json:"processParentId"`
	ProcessParentName  string      `json:"processParentName"`
	ProcessId    *model.UUID `json:"processId"`
	ProcessName  string      `json:"processName"`
	PlantId    *model.UUID `json:"plantId"`
	PlantName  string      `json:"plantName"`
	Priority int8 `json:"priority"`
	Type string `json:"type"`
	Category string `json:"category"`
	DescriptionRating string `json:"descriptionRating"`
	ResponsiblePerson string `json:"responsiblePerson"`
	CollectedAt *time.Time `json:"collectedAt"`
	TargetDefinition string `json:"targetDefinition"`
	MajorIssueDefinition string `json:"majorIssueDefinition"`
	RelevantTags string `json:"relevantTags"`
	BlockingPoints string `json:"blockingPoints"`
	Comments string `json:"comments"`
	ProjectName string `json:"projectName"`
	Risks []UseCasesMapping `json:"risks"`
	Machines []UseCasesMapping `json:"machines"`
	CommunicationStreams []UseCasesMapping `json:"communicationStreams"`
	ServiceLines []UseCasesMapping `json:"serviceLines"`
	BlockingPointsToServiceLines []UseCasesMapping `json:"blockingPointsToServiceLines"`
	Systems []UseCasesMapping `json:"systems"`
	UseCaseClusters []UseCasesMapping `json:"useCaseClusters"`
	Active      *bool       `json:"active"`
	CreatedAt   string      `json:"createdAt"`
	UpdatedAt   string      `json:"updatedAt"`
}

func ToUseCase(useCases *model.UseCases) *UseCases {
	
	risks := make([]UseCasesMapping,0)
	machines := make([]UseCasesMapping,0)
	communicationStreams := make([]UseCasesMapping,0)
	serviceLines := make([]UseCasesMapping,0)
	blockingPointsToServiceLines := make([]UseCasesMapping,0)
	systems := make([]UseCasesMapping,0)
	useCaseCluster := make([]UseCasesMapping,0)

	for _, v:= range useCases.Risks{
		temp := UseCasesMapping{
			Id: v.RiskId.String(), 
			Name: v.Risk.Name,
		}
		
		risks =append(risks,temp)
	}

	for _, v:= range useCases.Machines{
		temp := UseCasesMapping{
			Id: v.MachineId.String(), 
			Name: v.Machine.Name,
		}
		machines =append(machines,temp)
	}

	for _, v:= range useCases.CommunicationStreams{
		temp := UseCasesMapping{
			Id: v.CommunicationStreamId.String(), 
			Name: v.CommunicationStream.Name,
		}
		
		communicationStreams =append(communicationStreams,temp)
	}

	for _, v:= range useCases.ServiceLines{
		temp := UseCasesMapping{
			Id: v.ServiceLineId.String(), 
			Name: v.ServiceLine.Name,
		}
		
		serviceLines =append(serviceLines,temp)
	}

	for _, v:= range useCases.BlockingPointsToServiceLines{
		temp := UseCasesMapping{
			Id: v.ServiceLineId.String(), 
			Name: v.ServiceLine.Name,
		}
		
		blockingPointsToServiceLines =append(blockingPointsToServiceLines,temp)
	}

	for _, v:= range useCases.Systems{
		temp := UseCasesMapping{
			Id: v.SystemId.String(), 
			Name: v.System.Name,
		}
		
		systems =append(systems,temp)
	}

	for _, v:= range useCases.UseCaseClusters{
		temp := UseCasesMapping{
			Id: v.UseCaseClusterId.String(), 
			Name: v.UseCaseCluster.Name,
		}
		
		useCaseCluster =append(useCaseCluster,temp)
	}
	return &UseCases{
		Id:          useCases.ID.String(),
		CreatedAt:   useCases.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:   useCases.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:        useCases.Name,
		ParentId:    useCases.StandardParentId,
		ParentName: func() string {
			if useCases.UseCasesParent == nil {
				return ""
			}
			return useCases.UseCasesParent.Name
		}(),
		ProcessParentId: useCases.ProcessParentId,
		ProcessParentName: func() string {
			if useCases.ProcessParent == nil {
				return ""
			}
			return useCases.ProcessParent.Name
		}(),
		ProcessId: useCases.ProcessId,
		ProcessName: func() string {
			if useCases.Process == nil {
				return ""
			}
			return useCases.Process.Name
		}(),
		PlantId: useCases.PlantId,
		PlantName: func() string {
			if useCases.Plant == nil {
				return ""
			}
			return useCases.Plant.Name
		}(),
		Priority: useCases.Priority,
		Type: useCases.Type,
		Category: useCases.Category,
		DescriptionRating: useCases.DescriptionRating,
		ResponsiblePerson: useCases.ResponsiblePerson,
		CollectedAt: useCases.CollectedAt,
		TargetDefinition: useCases.TargetDefinition,
		MajorIssueDefinition: useCases.MajorIssueDefinition,
		RelevantTags: useCases.RelevantTags,
		BlockingPoints: useCases.BlockingPoints,
		Comments: useCases.Comments,
		ProjectName: useCases.ProjectName,
		Risks: risks,
		Machines: machines,
		CommunicationStreams: communicationStreams,
		ServiceLines: serviceLines,
		BlockingPointsToServiceLines: blockingPointsToServiceLines,
		Systems: systems,
		UseCaseClusters: useCaseCluster,
		Active:      useCases.Active,
	}
}

func ToUseCases(useCases []*model.UseCases) []UseCases {
	rs := make([]UseCases, 0, len(useCases))
	for _, useCase := range useCases {
		c := ToUseCase(useCase)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
