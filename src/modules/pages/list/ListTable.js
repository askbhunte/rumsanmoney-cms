import React, { useState, useContext, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import Paginate from "../../global/Paginate";
//ckeditor stuff
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../../services/MyUploader';
import {
    Button,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    CustomInput,
} from "reactstrap";
import { PagesContext } from "../../../contexts/PagesContext";

export default function PagesList() {
    const { addToast } = useToasts();
    const [model, setModel] = useState(false);
    const [current, setCurrent] = useState(0);

    const size = "xl";

    const { listPages, pages, pagination, addPages } = useContext(PagesContext);

    const handlePagination = (current_page) => {
        let _start = current_page * pagination.limit;
        setCurrent(current_page);
        let query = { name: "" };
        return loadPagesList({
            start: _start,
            limit: pagination.limit,
            ...query,
        });
    };
    const toggle = () => setModel(!model);

    const handleSearchInputChange = (e) => {
        const { value } = e.target;
        return fetchList({ start: 0, limit: pagination.limit, name: value });
    };

    const fetchList = (query) => {
        let params = { ...pagination, ...query };
        listPages(params)
            .then()
            .catch(() => {
                addToast("Something went wrong!", {
                    appearance: "error",
                    autoDismiss: true,
                });
            });
    };
    const loadPagesList = (query) => {
        if (!query) query = null;
        listPages(query)
            .then()
            .catch(() => {
                addToast("Something went wrong!", {
                    appearance: "error",
                    autoDismiss: true,
                });
            });
    };

    let get = useCallback(
        (params) => {
            listPages(params);
        },
        [listPages]
    );

    //ck editor part
  const [extraContent, setExtraContent] = useState('');
  const custom_config = {
      extraPlugins: [ MyCustomUploadAdapterPlugin ],
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
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      },
      // image: {
      //       // Configure the available styles.
      //       styles: [
      //           'alignLeft', 'alignCenter', 'alignRight'
      //       ],
      //       // Configure the available image resize options.
      //       resizeUnit: "%",
      //       resizeOptions: [
      //           {
      //               name: 'resizeImage:original',
      //               label: 'Original',
      //               value: null
      //           },
      //           {
      //               name: 'resizeImage:50',
      //               label: '50%',
      //               value: '50'
      //           },
      //           {
      //               name: 'resizeImage:75',
      //               label: '75%',
      //               value: '75'
      //           }
      //       ],

      //       // You need to configure the image toolbar, too, so it shows the new style
      //       // buttons as well as the resize buttons.
      //       toolbar: [
      //           'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
      //           '|',
      //           'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original',
      //           '|',
      //           'imageTextAlternative'
      //       ]
      //   }
    }
  //ck editor end
  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader)
    }
  }

    useEffect(fetchList, []);
    useEffect(loadPagesList, []);
    return (
        <>
            <Card>
                <CardTitle className="mb-0 p-3 border-bottom bg-light">
                    <Row>
                        <Col md="4">
                            <i className="mdi mdi-border-right mr-2"></i>Pages List
            </Col>
                        <Col md="6">
                            <div
                                style={{
                                    float: "right",
                                    display: "flex",
                                    marginRight: "-12%",
                                }}
                            >
                                <CustomInput
                                    type="select"
                                    id="exampleCustomSelect"
                                    name="customSelect"
                                    defaultValue=""
                                    style={{ width: "auto" }}
                                >
                                    <option value="name">Search By Name</option>
                                </CustomInput>
                                <div style={{ display: "inline-flex" }}>
                                    <Input
                                        placeholder="Enter Author Name ..."
                                        onChange={handleSearchInputChange}
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md="2">
                            <div style={{ float: "right" }}>
                                <Button color="info" onClick={(e) => toggle()}>
                                    Add New Page
                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardTitle>
                <CardBody>
                    <Table className="no-wrap v-middle" responsive>
                        <thead>
                            <tr className="border-0">
                                <th className="border-0">Name</th>
                                <th className="border-0">Slug</th>
                                <th className="border-0">Status</th>
                                <th className="border-0">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {pages.length ? (
                                pages.map((d) => {
                                    return (
                                        <tr key={d._id}>
                                            <td>{d.name || "N/A"}</td>
                                            <td>{d.slug || "N/A"}</td>
                                            <td>{d.status || "N/A"}</td>
                                            <td className="blue-grey-text  text-darken-4 font-medium">
                                                <Link className="btn btn-primary" to={`/pages/${d._id}`}>
                                                    Edit
                        </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                    <tr>
                                        <td colSpan={4}>No data available.</td>
                                    </tr>
                                )}
                        </tbody>
                    </Table>
                    <Paginate
                        limit={pagination.limit}
                        total={pagination.total}
                        current={current}
                        onChange={handlePagination}
                    />
                </CardBody>
            </Card>
            <Modal isOpen={model} toggle={toggle} size={size}>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();

                        addPages(e,extraContent)
                            .then((d) => {
                                addToast("Page Added successfully", {
                                    appearance: "success",
                                    autoDismiss: true,
                                });
                                get();
                                toggle();
                            })
                            .catch((err) =>
                                addToast(err.message, {
                                    appearance: "error",
                                    autoDismiss: true,
                                })
                            );
                    }}
                >
                    <ModalHeader toggle={toggle}>
                        <div>
                            <h3>Add New page</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                                gridColumnGap: "10px",
                            }}
                        >
                            <div className="form-item">
                                <label htmlFor="name">Page Name</label>
                                <br />
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Page Title"
                                    className="form-field"
                                    required
                                />
                            </div>                            
                            <div className="form-item">
                                <label htmlFor="ckcontent">ckContent</label>
                                <br />
                                <CKEditor editor={ ClassicEditor } config={custom_config} data={extraContent}  onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                        setExtraContent(data);
                                } }/>
                            </div>                            
                            <div className="form-item">
                                <label htmlFor="content">Status</label>
                                <br />
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
                            </div>
                        </div>
                        <br />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Submit</Button>

                        <Button color="secondary" onClick={toggle}>
                            Cancel
            </Button>
                    </ModalFooter>
                </Form>
            </Modal>
            <br />
        </>
    );
}
