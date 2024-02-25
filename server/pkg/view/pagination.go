package view

import (
	"errors"
	"strconv"
)

type Pagination struct {
	Page int64  `json:"page" form:"page,default=0"`            // page index
	Size int64  `json:"size" form:"size"`                      // page size
	Sort string `json:"sort" form:"sort" swaggerignore:"true"` // sort field
} // @name Pagination


func GetPaginationFromRequest(page string, limit string) (int, int, error){
	pageConvert ,err:= strconv.Atoi(page)
	if err != nil {
		return 0, 0, errors.New("Page is not a number")
	}
	limitConvert, err:=strconv.Atoi(limit)
	if err != nil {
		return 0,0, errors.New("Limit is not a number")
	}
	return pageConvert, limitConvert, nil

}