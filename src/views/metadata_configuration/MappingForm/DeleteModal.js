import React, { useState } from 'react'
import {
    Button,
    ButtonStrip,
    ModalActions,
    ModalContent,
    ModalTitle,
    ReactFinalForm,
} from '@dhis2/ui'
import { Modal } from 'react-responsive-modal'
const { Form } = ReactFinalForm

export const DeleteModal = ({ onSubmit, onCancel }) => {
    const AreYouSureString = 'Are you sure you want to delete the selected row?'
    const ConfirmString = 'Confirm deletion'
    const DeleteButtonString = 'Delete'
    const CancelString = 'Cancel'

    return (
        <Modal open={true} onClose={onCancel} center>
            <Form onSubmit={() => onSubmit(true)}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalTitle>{ConfirmString}</ModalTitle>
                        <ModalContent>{AreYouSureString}</ModalContent>
                        <ModalActions>
                            <ButtonStrip>
                                <Button destructive type="submit">
                                    {DeleteButtonString}
                                </Button>
                                <Button onClick={onCancel}>
                                    {CancelString}
                                </Button>
                            </ButtonStrip>
                        </ModalActions>
                    </form>
                )}
            </Form>
        </Modal>
    )
}
