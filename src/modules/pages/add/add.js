import React, { useContext, useState } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../core/contexts';
import { useToasts } from 'react-toast-notifications';
//ckeditor stuff
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../../services/MyUploader';
import { PagesContext } from "../../../contexts/PagesContext";


const Add = () => {
    const { listPages, pages, pagination, addPages } = useContext(PagesContext);
    const [extraContent, setExtraContent] = useState('');
    const custom_config = {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        height: '400px',
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'blockQuote',
                'insertTable',
                '|',
                'imageUpload', 'mediaEmbed', '|',
                'undo',
                'redo'
            ],

        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        }
    }
    //ck editor end
    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader)
        }
    }
    const { addToast } = useToasts();
    const { add } = useContext(Context);
    const history = useHistory();

    const handleFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            name: formData.get('title'),
            content: extraContent,
            status: formData.get('status'),
        };
        saveDetails(payload);
    };

    const saveDetails = payload => {
        addPages(payload)
            .then(() => {
                addToast('Page added successfully!', {
                    appearance: 'success',
                    autoDismiss: true
                });
                history.push('/pages');
            })
            .catch(err => {
                addToast(err.message, {
                    appearance: 'error',
                    autoDismiss: true
                });
            });
    };

    return (
        <Card>
            <CardHeader>Add New Pages</CardHeader>
            <CardBody>
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label for="title">Page Title:</Label>
                        <Input type="text" name="title" id="title" placeholder="Enter Title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="sub_title">Content:</Label>
                        <br />
                        <CKEditor editor={ClassicEditor} config={custom_config} data={extraContent} onChange={(event, editor) => {
                            const data = editor.getData();
                            setExtraContent(data);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Status">Status:</Label>
                        <Input
                            type="select"
                            name="status"
                            placeholder="Status"
                            className="form-field"
                            required
                        >
                            <option value="">-- Select Type --</option>
                            <option value="PUBLISHED">PUBLISHED</option>
                            <option value="DRAFT">DRAFT</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                    <Link to="/pages" className="btn btn-danger ml-2">
                        Cancel
					</Link>
                </Form>
            </CardBody>
        </Card>
    );
};
export default Add;
