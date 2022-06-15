import React from 'react'
import { NoticeBox, Button, ButtonStrip } from '@dhis2/ui'

export const EndScreen = ({ text, errors, onCancel }) => {
    console.log({ errors })
    if (!!errors && errors.length > 0)
        return (
            <>
                <NoticeBox
                    error
                    title={'Errors have occurred during data transmission'}
                >
                    {text}
                    <ol>
                        {errors.map((e, i) => (
                            <li key={i}>{e}</li>
                        ))}
                    </ol>
                </NoticeBox>
                <div style={{ marginTop: '14px' }}>
                    <ButtonStrip>
                        <Button onClick={() => onCancel()}>Return</Button>
                    </ButtonStrip>
                </div>
            </>
        )
    return (
        <>
            <NoticeBox
                style={{ marginBottom: '100px' }}
                title={'Finished successfully'}
            >
                {text}
            </NoticeBox>
            <div style={{ marginTop: '14px' }}>
                <ButtonStrip>
                    <Button onClick={() => onCancel()}>Return</Button>
                </ButtonStrip>
            </div>
        </>
    )
}
