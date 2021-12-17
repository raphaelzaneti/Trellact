import React from 'react'

export default props =>{
    const id = "modal-"+props.id

    return (
            <>
                <button id={"btn-del-"+props.id} className="delete-btn btn-close" aria-label="Close" data-bs-toggle="modal" data-bs-target={"#"+id} ></button>
            
                <div class="modal fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirm, please</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure that you want to delete {props.name} {props.type}?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick = {props.onClick}>Yes, delete this {props.type}!</button>
                            </div>
                        </div>
                    </div>
                </div>
            
            </>
    )
}