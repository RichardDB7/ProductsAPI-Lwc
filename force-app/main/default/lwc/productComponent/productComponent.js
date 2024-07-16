import { LightningElement, track } from 'lwc';
import retriveProducts from "@salesforce/apex/productController.retriveProducts";
import './productComponent.css'; 

export default class ProductComponent extends LightningElement {
    @track result = [];
    @track selectedProduct = {};
    @track isModalOpen = false;

    get modalClass() {
        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : ""}`;
    }

    get modalBackdropClass() {
        return this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop";
    }

    connectedCallback() {
        this.fetchProducts();
    }

    fetchProducts() {
        retriveProducts().then(response => {
            console.log(response);
            this.formatProductData(response);
        }).catch(error => {
            console.error(error);
        });
    }

    formatProductData(res) {
        this.result = res
            .filter(item => item.image)  // Filtrar los elementos sin imagen
            .map((item, index) => {
                let id = `product_${index + 1}`;
                return { ...item, id: id };
            });
    }

    showModal(event) {
        let id = event.target.dataset.item;
        this.result.forEach(item => {
            if (item.id === id) {
                this.selectedProduct = { ...item };
            }
        });
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
