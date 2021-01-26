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
                                <b-dropdown-item>Generate auto subscription</b-dropdown-item>
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
                                <span class="counter mr-2">0</span>
                            </div>
                            <div class="filter-item mr-3  text-center" @click="changeStatus('draft')" :class="[activeStatus === 'draft' ? 'active' : null]">
                                <span class="mr-2 " :class="[activeStatus === 'draft' ? 'active' : null]">Draft</span>
                                <span class="counter mr-2">0</span>
                            </div>
                            <div class="filter-item text-center" @click="changeStatus('all')" :class="[activeStatus === 'all' ? 'active' : null]">
                                <span class="mr-2" :class="[activeStatus === 'all' ? 'active' : null]">All invoices</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
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
                            <e-column width="200" field="price" headerText="Date" ></e-column>
                            <e-column width="200" field="price" headerText="Number" ></e-column>
                            <e-column width="200" field="price" headerText="Amount Due" ></e-column>
                            
                        </e-columns>
                    </ejs-grid>
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


import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        MasterLayout,
        Datepicker,
        TableLoader
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search]
    },
    data() {
        return {
            from: '',
            to: '',
            activeStatus: 'unpaid',
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
            data: [
                {
                    name: 'Eben Oluwasegun',
                    price: '50.00'
                },
                 {
                    name: 'Omoruyi Isaac',
                    price: '100.00'
                },
                {
                    name: 'Olaitan Akinromade',
                    price: '500.00'
                },
                {
                    name: 'Favour chi',
                    price: '1,000.00'
                },
                {
                    name: 'Tunde Ednut',
                    price: '2,500.00'
                },
                {
                    name: 'Ismail Danfodio',
                    price: '4,500.00'
                }
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
        // Jquery Dependency

        $("input[data-type='currency']").on({
            keyup: function() {
            formatCurrency($(this));
            },
            blur: function() { 
            formatCurrency($(this), "blur");
            }
        });


        function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }


        function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.
        
        // get input value
        var input_val = input.val();
        
        // don't validate empty input
        if (input_val === "") { return; }
        
        // original length
        var original_len = input_val.length;

        // initial caret position 
        var caret_pos = input.prop("selectionStart");
            
        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);
            
            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
            right_side += "00";
            }
            
            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = "₦" + left_side + "." + right_side;

        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = "₦" + input_val;
            
            // final formatting
            if (blur === "blur") {
            input_val += ".00";
            }
        }
        
        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
        }

        // this.fromDate = this.pluginStartDate;

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

    },
    methods: {
        changeStatus(status) {
            this.activeStatus = status
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