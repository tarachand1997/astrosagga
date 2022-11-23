import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToast, CToastBody, CToastHeader, CToaster, CFormInput, CFormLabel, CForm, CFormTextarea, CFormSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getProductCategory, getProducts, addProducts, deleteProducts } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const Products = () => {
  const productList = useSelector((state) => state.admin.productList)
  const productCategoryList = useSelector((state) => state.admin.productCategoryList)
  const dispatch = useDispatch()
  const [productData, setProductData] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedData, setSelectedData] = useState({})
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [validated, setValidated] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  useEffect(() => {
    dispatch(getProductCategory())
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    setProductData(productList)
  }, [productList])

  const deleteModal = (item) => {
    setSelectedData(item)
    setVisibleDelete(true);
  }

  const handleDelete = () => {
    let apiData = {
      id: selectedData.id
    };
    dispatch(deleteProducts(apiData, (response) => handleDeleteResponse(response)));
  }

  const handleDeleteResponse = (response) => {
    setVisibleDelete(false);
    let successToast = (
      <CToast title="Product" autohide={true}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <strong className="me-auto">Product</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response == "error" ? "Product Deleted Failed" : "Product Deleted Successfully"}</CToastBody>
      </CToast>
    )
    addToast(successToast);
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      return
    }
    let apiData = new FormData();
    apiData.append("product_cat_id", event.target.astCategory.value)
    apiData.append("productName", event.target.astName.value)
    apiData.append("price", event.target.astPrice.value)
    apiData.append("discount", event.target.astDiscount.value)
    apiData.append("totalQuantity", event.target.astQty.value)
    apiData.append("image", event.target.astImage.files[0])
    apiData.append("otherImage", event.target.astImageOth.files[0])
    apiData.append("description", event.target.description.value)
    dispatch(addProducts(apiData, (res) => handleAddResponse(res)))
  }

  const handleAddResponse = (response) => {
    setVisibleAdd(false);
    let successToast = (
      <CToast title="Product" autohide={true}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill={response === "error" ? "red" : "#007aff"}></rect>
          </svg>
          <strong className="me-auto">Product</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response === "error" ? "Product Add Failed" : "Product Added Successfully"}</CToastBody>
      </CToast>
    )
    addToast(successToast);
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className='d-md-flex'>
            <strong>Products List</strong> <small></small>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                className='me-md-2 btn-sm'
                color={"primary"}
                onClick={() => setVisibleAdd(true)}
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {/* <p className="text-medium-emphasis small">
              Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
              tables look in CoreUI.
            </p> */}
            {/* <DocsExample href="components/table"> */}
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Sr. No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  productData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.productName}</CTableDataCell>
                        <CTableDataCell>{item.price}</CTableDataCell>
                        <CTableDataCell>{item.discount}</CTableDataCell>
                        <CTableDataCell>
                          <img src={`${IMAGE_BASE_URL}${item.file_path}/${item.image}`} height="50" width="50" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CIcon onClick={() => deleteModal(item)} icon={cilTrash} className="me-2 danger" />
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })
                }
              </CTableBody>
            </CTable>
            {/* </DocsExample> */}
          </CCardBody>

          {/* Add Modal */}
          <CModal size='lg' visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
            <CModalHeader>
              <CModalTitle>Add</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleAdd}
                encType="multipart/form-data"
              >
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astCategory">
                    Select Category
                  </CFormLabel>
                  <CFormSelect name='astCategory' id='astCategory' aria-label="Default select example">
                    <option value="">Select Category</option>
                    {
                      productCategoryList.map((item) => {
                        return <option value={item.id}>{item.name}</option>
                      })
                    }
                  </CFormSelect>
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astName">
                    Name
                  </CFormLabel>
                  <CFormInput
                    name='astName'
                    id="astName"
                    required
                    type="text"
                    placeholder="Enter Name"
                    aria-label="default input example"
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astPrice">
                    Price
                  </CFormLabel>
                  <CFormInput
                    name='astPrice'
                    id="astPrice"
                    required
                    type="number"
                    placeholder="Enter Price"
                    aria-label="default input example"
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astDiscount">
                    Discount
                  </CFormLabel>
                  <CFormInput
                    name='astDiscount'
                    id="astDiscount"
                    required
                    type="number"
                    placeholder="Enter Discount"
                    aria-label="default input example"
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astQty">
                    Quantity
                  </CFormLabel>
                  <CFormInput
                    name='astQty'
                    id="astQty"
                    required
                    type="number"
                    placeholder="Enter Qty"
                    aria-label="default input example"
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astImage">
                    Select Image
                  </CFormLabel>
                  <CFormInput
                    name='astImage'
                    type="file"
                    id="astImage"
                    aria-label="file example"
                    required
                  />
                  {/* <CFormFeedback invalid>Category Image Required</CFormFeedback> */}
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astImageOth">
                    Select Other Image
                  </CFormLabel>
                  <CFormInput
                    name='astImageOth'
                    type="file"
                    id="astImageOth"
                    aria-label="file example"
                    required
                  />
                  {/* <CFormFeedback invalid>Category Image Required</CFormFeedback> */}
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astDes" className="form-label">
                    Description
                  </CFormLabel>
                  <CFormTextarea
                    id="astDes"
                    name="description"
                    placeholder="Description"
                    // invalid
                    required
                    rows={4}
                  ></CFormTextarea>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton type='submit' color="primary">Add</CButton>
                  <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
                    Cancel
                  </CButton>
                </div>
              </CForm>
            </CModalBody>
          </CModal>
          {/* Add Modal */}

          {/* Delete Modal */}
          <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
            <CModalHeader>
              <CModalTitle>Delete</CModalTitle>
            </CModalHeader>
            <CModalBody>Are you sure to delete?</CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                No
              </CButton>
              <CButton onClick={() => handleDelete()} color="primary">Yes</CButton>
            </CModalFooter>
          </CModal>
          {/* Delete Modal */}

          <CToaster ref={toaster} push={(toast)} placement="top-end" />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Products
