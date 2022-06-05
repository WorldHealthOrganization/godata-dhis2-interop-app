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

export const DeleteModal = ({ open: openState, onSubmit }) => {
    const AreYouSureString = 'Are you sure you want to delete the selected row?'
    const ConfirmString = 'Confirm deletion'
    const DeleteButtonString = 'Delete'
    const CancelString = 'Cancel'

    const [open, setOpen] = useState(openState)

    const onClose = () => {
        setOpen(false)
    }
    console.log({open})
    return (
        <Modal open={openState} onClose={() => onClose(false)} center>
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
                                <Button onClick={() => setOpen(false)}>
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
