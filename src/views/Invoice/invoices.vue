<template>
    <div>
        <MasterLayout>
            <div class="py-4">
                <div class="dialog-container">
                    <div class="row">
                        <div class="col-md-7">
                            <h4 class="primary-color"> Invoices</h4>
                        </div>
                        <div class="col-md-5 text-right create-invoice-dropdwon">
                            <b-dropdown id="dropdown-right" right text="Create an invoice" variant="primary" class="m-2">
                                <b-dropdown-item>
                                    <router-link :to="{name: 'invoice'}">
                                        Create an invoice
                                    </router-link>
                                </b-dropdown-item>
                                <b-dropdown-item>
                                    <router-link :to="{name: 'auto_subscription'}">
                                        Generate auto subscription
                                    </router-link>
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    <div class="invoice-banner mt-3">
                        <div>
                            <div>
                                <span class="deep-grey bold-span invoice-header">Overdue</span>
                            </div>
                            <div class="">
                                <span><span class="currency">₦</span><span class="amount-figures">1,641.22</span><span class="grey-text bold-span">NGN</span></span>
                            </div>
                            <div class="grey-text">
                                <span>Last updated 11 minutes ago.</span>
                            </div>
                        </div>
                         <div>
                            <div>
                                <span class="deep-grey bold-span invoice-header">Due within next 30 days</span>
                            </div>
                            <div>
                                 <span><span class="currency">₦</span><span class="amount-figures">0.00</span><span class="grey-text bold-span">NGN</span></span></span>
                            </div>
                        </div>
                         <div>
                             <div>
                                <span class="deep-grey bold-span invoice-header">Average time to get paid</span>
                            </div>
                            <div>
                                <span><span class="amount-figures">0</span><span class="grey-text bold-span">days</span></span></span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <span class="counter mr-2">
                            0
                        </span>
                        <span class="bold-span">
                            Active filters
                        </span>
                    </div>
                    <div class="mt-3">
                        <form>
                            <div class="row ">
                                <div class="col-md-4 padding-right-none position-relative">
                                   <div class="dropdown-select-container cursor-pointer dropdown-parent" @click="toggleDropdown">
                                        <div class="row align-items-center  height-100 pl-3 pr-3">
                                            <div class="col-md-10">
                                                <span class="dropdown-value">All customers</span>
                                            </div>
                                            <div class="col-md-2">
                                                <i class="fa fa-caret-down" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                   </div>
                                   <div class="dropdown__content" v-if="showDropdown">
                                       <div class="dropdown-select-wrapper m-3">
                                            <div class="row align-items-center">
                                                <div class="col-md-1 text-right padding-right-none">
                                                    <i class="fa fa-search ml-2"  aria-hidden="true"></i>
                                                </div>
                                                <div class="col-md-10">
                                                    <input type="text" autofocus  class="form-control dropdown-search" placeholder="Type a customer name"    />
                                                </div>
                                            </div>
                                       </div>
                                       <ul class="dropdown-menu-list">
                                            <li class="dropdown-list cursor-po">Eben</li>
                                            <li class="dropdown-list">Temitop</li>
                                       </ul>
                                   </div>
                                </div>
                                <div class="col-md-2 padding-right-none">
                                     <vue-ctk-date-time-picker
                                            id="DateTimePicker"
                                            v-model="fromDate"
                                            color="#370F70"
                                            format="YYYY-MM-DD"
                                            formatted="DD/MM/YYYY"
                                            position="bottom"
                                            :onlyDate="true"
                                            :autoClose="true"
                                            :label="fromLabel"
                                            
                                        />  
                                       
                                </div>
                                <div class="col-md-4 padding-right-none">
                                    <div class="row">
                                        <div class="col-md-6 padding-right-none">
                                           <vue-ctk-date-time-picker
                                                id="DateTimePicker"
                                                v-model="toDate"
                                                color="#370F70"
                                                format="YYYY-MM-DD"
                                                formatted="DD/MM/YYYY"
                                                position="bottom"
                                                :onlyDate="true"
                                                :autoClose="true"
                                                :label="toLabel"
                                            />  
                                        </div>
                                        <div class="col-md-6">
                                            <select class="form-control" >
                                                <option disabled selected value="select company">All statuses</option>
                                                <option >Draft</option>
                                                <option >Paid</option>
                                                <option >Overdue</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" autofocus  class="form-control" placeholder="Enter invoice #"    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="mt-3">
                        <div class="filter-menu">
                            <div class="filter-item mr-3 text-center" @click="changeStatus('unpaid')" :class="[activeStatus === 'unpaid' ? 'active' : null]">
                                <span class="mr-2" :class="[activeStatus === 'unpaid' ? 'active' : null]">Unpaid</span>
                                <span class="counter mr-2">{{unpaidCount}}</span>
                            </div>
                            <div class="filter-item mr-3  text-center" @click="changeStatus('draft')" :class="[activeStatus === 'draft' ? 'active' : null]">
                                <span class="mr-2 " :class="[activeStatus === 'draft' ? 'active' : null]">Draft</span>
                                <span class="counter mr-2">{{draftCount}}</span>
                            </div>
                            <div class="filter-item text-center" @click="changeStatus('all')" :class="[activeStatus === 'all' ? 'active' : null]">
                                <span class="mr-2" :class="[activeStatus === 'all' ? 'active' : null]">All invoices</span>
                                <span class="counter mr-2">{{copiedData.length}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="position-relative">
                    <ejs-grid
                        v-show="!showLoader"
                        ref="dataGrid"
                        :created="refreshGrid"
                        :allowPaging="true"
                        :allowSorting="true"
                        :pageSettings="tableProps.pageSettings"
                        :toolbar="tableProps.toolbar"
                        :searchSettings="tableProps.search"
                        :allowExcelExport="false"
                        :allowPdfExport="false"
                        :toolbarClick="toolbarClick"
                        :allowTextWrap='true'
                        :dataSource="data"
                        >
                        <e-columns>
                            <e-column width="100" :template="invoiceTemplate" headerText="Status"></e-column>
                            <e-column width="200" field="due" headerText="Due Date" ></e-column>
                            <e-column width="200" field="customer" headerText="Customer" ></e-column>
                            <e-column width="200" field="amountDue" headerText="Amount Due" ></e-column>
                            <e-column :template="list_of_invoices_templates" headerText="Action" width="200"></e-column>
                        </e-columns>
                    </ejs-grid>
                    <DropDown :details="details"/>
                </div>
            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '../MasterLayout'
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import Datepicker from 'vuejs-datepicker';
import {Page,Sort,Toolbar,Search, groupAggregates} from "@syncfusion/ej2-vue-grids";
import Temp from '@/components/Templates/invoices';
import DropDown from '@/components/Templates/Dropdown/dropdown.vue';
import invoiceTemp from '@/components/Templates/list_of_invoices_template.vue';




import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        MasterLayout,
        Datepicker,
        TableLoader,
        DropDown
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search]
    },
    data() {
        return {
            from: '',
            to: '',
            activeStatus: 'all',
            unpaidCount: 0,
            draftCount: 0,
            allCount:0,
            options: [
                { name: 'Delhi', id: '1' },
                { name: 'Bhopal', id: '2' },
                { name: 'Patna', id: '3' },
                { name: 'Ranchi', id: '4' },
                { name: 'Noida', id: '5' }                         
            ],   
            fromLabel: 'From',
            invoiceTemplate: () => {
                return {
                    template: Temp
                };
            },
            toLabel: 'To',
            isButtonDisabled: false,
            scheduleDateTime: null,
            showLoader: false,
            fromDate: this.fromStartDate,
            toDate: this.toStartDate,
            toStartDate: this.$moment().format("MMMM D, YYYY"),
            fromStartDate: this.$moment().format("MMMM D, YYYY"),
            pluginStartDate: this.$moment().format("D-M-YYYY"),
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ['Search'],
                search: { operator: "contains", ignoreCase: true },
            },
            invoiceNumber: 1,
            showCompanies: false,
            companies: [],
            companyId:"select company",
            showDropdown: false,
            details: {
                queryStrings: { invoiceId: '' }, 
                info: [ { name: 'Edit', link: '' }], 
                delete: { hasDelete: true, deleteName: 'deleteInvoice', name: 'Delete', query: '' }
                // delete: { hasDelete: true, deleteName: 'deleteCompany', arg: 'companyId'}
            }, 
            list_of_invoices_templates: function() {
                return {
                    template: invoiceTemp
                };
            },
            data: [
                {
                    customer: 'Eben Oluwasegun',
                    due: '21-01-25',
                    status: 'overdue',
                    amountDue: '₦ 3,284.00',
                    index: 1,
                },
                 {
                    customer: 'Omoruyi Isaac',
                    due: '21-01-25',
                    status: 'draft',
                    amountDue: '₦ 3,284.00',
                    index: 2,
                },
                {
                    customer: 'Olaitan Akinromade',
                    due: '21-01-25',
                    status: 'overdue',
                    amountDue: '₦ 3,284.00',
                    index: 3,
                },
                {
                    customer: 'Favour chi',
                    due: '21-01-25',
                    status: 'draft',
                    amountDue: '₦ 3,284.00',
                    index: 4,
                },
                {
                    customer: 'Tunde Ednut',
                    due: '21-01-25',
                    status: 'overdue',
                    amountDue: '₦ 3,284.00',
                    index: 5,
                },
            ],
            copiedData: [
                {
                    customer: 'Eben Oluwasegun',
                    due: '21-01-25',
                    status: 'overdue',
                    amountDue: '₦ 3,284.00'
                },
                 {
                    customer: 'Omoruyi Isaac',
                    due: '21-01-25',
                    status: 'draft',
                    amountDue: '₦ 3,284.00'
                },
                {
                    customer: 'Olaitan Akinromade',
                    due: '21-01-25',
                    status: 'overdue',
                    amountDue: '₦ 3,284.00'
                },
                {
                    customer: 'Favour chi',
                    due: '21-01-25',
                    status: 'draft',
                    amountDue: '₦ 3,284.00'
                },
                {
                    customer: 'Tunde Ednut',
                    due: '21-01-25',
                    status: 'overdue',
                    amountDue: '₦ 3,284.00'
                },
            ],
        }
    },
    mounted() {
        document.addEventListener('click' , (e) => {
            if(e.target.contains(document.querySelector('.dropdown__content'))) {
                this.showDropdown = !this.showDropdown
            }
        })
        this.getCompanies()
        Array.from(document.getElementsByTagName('input')).forEach(input => {
            if(!Array.from(input.classList).includes('form-control')) {
                input.classList.add('form-control')
            }
        })
       
    },
    watch: {
        fromDate: function (newDate) {
            if (newDate) {
                this.fromStartDate = this.$moment(newDate, "DD-MM-YYYY").format("MMMM D, YYYY")
            }
        },
        toDate: function (newDate) {
            if (newDate) {
                this.toStartDate = this.$moment(newDate, "DD-MM-YYYY").format("MMMM D, YYYY")
            }
        },
    },
    computed: {
        totalAmount() {
            return this.invoiceItems.reduce((acc,cur) => {
                return acc += ((cur.quantity * cur.price))
            }, 0)
        }
    },
    created() {
        this.$eventHub.$on('showInvoicesDropdown', (data) => {
            const option = document.getElementById('myDropdown')
            option.classList.add("show")
            if ((data.index == this.copiedData.length &&  this.copiedData.length > 1) ) {
                // const num = this.details.delete.hasDelete ? 1 : 0
                // option.style.top = `${(((62 * (data.index - 1))) + 108 - (32 * ( this.details.info.length))).toString()}px`
                option.style.top = `${((62 * data.index) + (100 - (data.index * 2))).toString()}px`

            } else {
                option.style.top = `${((62 * data.index) + (100 - (data.index * 2))).toString()}px`
            }
        })
    },
    methods: {
        changeStatus(status) {
            this.activeStatus = status
            if(status === 'draft') {
                const data = this.copiedData.filter(el => el.status === 'draft')
                this.draftCount = data.length
                this.data = data
            }
             if(status === 'unpaid') {
                const data = this.copiedData.filter(el => el.status === 'overdue')
                this.unpaidCount = data.length
                this.data = data
            }
            if(status === 'all') {
                this.allCount = this.copiedData.length
                this.data = this.copiedData
            }
        },
        
        toggleDropdown() {
          this.showDropdown = !this.showDropdown
        },
        getCompanies() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company`, configObject.authConfig())
                .then(res => {
                    this.companies = res.data.data
            })
            .catch(error => {

            });
        },
        toggleCompaniesDropdown(){
            this.showCompanies = !this.showCompanies
        },
        removeItem(i) {
            let items = [...this.invoiceItems]
            items.splice(i,1)
            this.invoiceItems = items

        },
        addItem() {
            this.invoiceItems.push({
                item: '',
                description: '',
                quantity: 1,
                price: 0,
                amount: '',
                tax: ''
            })
        },
        refreshGrid() {
            this.$refs.dataGrid.refresh();
        },
        toolbarClick(args) {
            switch (args.item.text) {
                case "PDF Export":
                let pdfExportProperties = {
                    pageOrientation: 'Landscape',
                    fileName: "branches.pdf"
                }
                    this.$refs.dataGrid.pdfExport(pdfExportProperties);
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
    },
}



</script>