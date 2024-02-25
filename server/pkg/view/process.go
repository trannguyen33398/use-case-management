package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateProcessResponse struct {
	Data *Process `json:"data"`
}

type Process struct {
	Id         string      `json:"id"`
	Name       string      `json:"name"`
	ParentId   *model.UUID `json:"parentId"`
	Type       string      `json:"type"`
	FocusField *bool       `json:"focusField"`
	Active     *bool       `json:"active"`
	ParentName string      `json:"parentName"`
	CreatedAt  string      `json:"createdAt"`
	UpdatedAt  string      `json:"updatedAt"`
}

func ToProcess(process *model.Processes) *Process {
	processParentName := ""
	if process.ProcessParent != nil {
		processParentName = process.ProcessParent.Name
	}
	return &Process{
		Id:         process.ID.String(),
		CreatedAt:  process.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:  process.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:       process.Name,
		ParentId:   process.ParentId,
		Type:       process.Type,
		Active:     process.Active,
		FocusField: process.FocusField,
		ParentName: processParentName,
	}
}

func ToProcesses(processes []*model.Processes) []Process {
	rs := make([]Process, 0, len(processes))
	for _, process := range processes {
		c := ToProcess(process)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
