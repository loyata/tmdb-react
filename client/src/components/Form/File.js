import React from 'react';
import Form from 'react-bootstrap/Form'


const File = ()=>{

        return (
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" />
            </Form.Group>
        );

}

export default File;