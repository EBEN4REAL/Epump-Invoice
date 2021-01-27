<template>
    <div>
        <MasterLayout>
            <div class="py-4">
                <div class="dialog-container" style="width: 80%">
                    <div class="row">
                        <div class="col-md-7">
                            <h4 class="primary-color">New Invoice</h4>
                        </div>
                        <div class="col-md-5 text-right">
                            <button class="rounded-button transparent mr-3">Preview</button>
                            <button class="rounded-button colored text-white">Save and contiue</button>
                        </div>
                        <div class="w-100 pl-3 pr-3">
                            <form class="mt-3">
                                <div class="mt-3">
                                    <div class="form_input">
                                        <select class="form-control">
                                            <option>Businesss address and contact details, title, summary, and logo</option>
                                            <option>Fuelmetrics</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="invoice-container mt-3">
                            <div class="add_customer_conainer">
                                <div class="add_customer">
                                    <div class="row align-items-center" v-if="showCompanies">
                                        <div class="col-md-9">
                                             <div class="w-100 p-3" >
                                                <select v-model="companyId" class="form-control" >
                                                    <option disabled selected value="select company">select company</option>
                                                    <option :value="cp.id" v-for="(cp,i) in companies" :key='i'>{{cp.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <i class="fa fa-times primary-color cursor-pointer" style="font-size: 20px" title="cancel" aria-hidden="true" @click="toggleCompaniesDropdown"></i>

                                        </div>
                                    </div>
                                    <button class="rounded-button transparent ml-3 mt-2" v-if="showCompanies">Generate Invoice</button>
                                    <div class="add_custoemr_card mt-3 ml-3" @click="toggleCompaniesDropdown" v-if="!showCompanies">
                                        <span>
                                            <i class="fa fa-building-o mr-2 primary-color" aria-hidden="true"></i> <span class="primary-color" >Select company</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="invoice_details pr-3">
                                    
                                    <!-- <div class="row align-items-center mt-3">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Invoice number</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <input type="text"  class="form-control" v-model="invoiceNumber"  />
                                            </div>
                                        </div>
                                    </div> -->
                                    <!-- <div class="row align-items-center mt-2">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">PO/SO number</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <input type="text"  class="form-control"  />
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="row align-items-center mt-2">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Invoice date</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                               <Datepicker />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center mt-2">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Payment due</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <Datepicker />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center mt-2">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Rate</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <input type="text"  class="form-control" v-model="rate"  />
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="table-header mt-5">
                                <button class="invoice-edit-button"><i class="fa fa-pencil mr-1 primary-color" aria-hidden="true"></i> Edit Columns</button>
                                <div class="invoice_items">
                                    <span class="primary-color">Items</span>
                                </div>
                                <div class="quantity">
                                    <span class="primary-color">Quantity</span>
                                </div> 
                                <div class="price">
                                    <span class="primary-color">Price</span>
                                </div>
                                <div class="amount">
                                    <span class="primary-color">Amount</span>
                                </div>
                            </div>
                        <div class="invoice__details" v-for="(invoice, i) in invoiceItems" :key="i">
                                <div class="table-header" >
                                    <div class="invoice_items pr-2">
                                        <div class="row">
                                            <div class="col-md-4 padding-right-none">
                                                <input type="text"  class="form-control"  v-model="invoice.item" placeholder="Enter item name" />
                                            </div>
                                            <div class="col-md-8">
                                                <textarea  class="form-control" v-model="invoice.description" placeholder="Enter item description"  /></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="quantity pr-2">
                                        <input type="text"  class="form-control" v-model="invoice.quantity"   />
                                    </div> 
                                    <div class="price pr-2">
                                        <input type="text" class="form-control" name="currency-field" id="currency" pattern="^\₦\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="" placeholder="price" v-model="invoice.price">
                                    </div>
                                    <div class="amount">
                                        <span class="primary-color mr-2">&#8358;  {{invoice.quantity * invoice.price}}.00</span>
                                        <span @click="removeItem(i)">
                                            <i class="fa fa-trash table-icon" aria-hidden="true" style="color: red" ></i>
                                        </span>
                                       
                                    </div>
                                
                                    </div>
                                    <div class="p-3 tax-row">
                                        <div class="row align-items-center">
                                            <div class="col-md-5">
                                                <span class="primary-color bold-span">Edit income account</span>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="row align-items-center">
                                                    <div class="col-md-3 text-right">
                                                        <span class="primary-color mr-2 bold-span">Tax</span>
                                                    </div>
                                                    <div class="col-md-9">
                                                        <select class="form-control" style="width: 88%" v-model="invoice.tax">
                                                            <option value="tax1">Tax 1</option>
                                                            <option value="tax2">Tax 2</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 text-right primary-color">
                                                <i class="fa fa-minu primary-color" aria-hidden="true"></i>
                                                <span class="primary-color bold-span">₦ {{invoice.taxPrice}}.00</span>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mt-3 cursor-pointer position-relative">
                                    <i class="fa fa-plus-circle mr-2 primary-color" aria-hidden="true"></i>
                                    <span class="primary-color bold-span"  @click="toggleDropdown" v-if="!showDropdown">Add an item</span>
                                    <div class="dropdown__content" style="top: -13px" v-show="showDropdown">
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
                                            <li class="dropdown-list cursor-po" v-for="(prod,i) in products" :key="i" @click="selectItem(prod)">
                                                <div class="product-list">
                                                    <div>
                                                        <span class="primary-color">{{prod.item}}</span>
                                                    </div>
                                                    <div>
                                                        ₦ {{prod.priceFormatted}}
                                                    </div>
                                                </div>
                                            </li>
                                       </ul>
                                       <div class="text-center p-3">
                                            <i class="fa fa-plus-circle mr-2 primary-color" aria-hidden="true"></i>
                                            <span class="primary-color bold-span"  @click="addItem">Create a item</span>
                                       </div>
                                   </div>
                                </div>
                                <div class="text-right mt-3 cursor-pointer pr-3">
                                    <span class="primary-color mr-3 bold-span">Sub Total: </span>
                                    <span class="primary-color bold-span">&#8358;  {{subTotal}}.00</span>
                                </div>
                                <div class="text-right mt-3 cursor-pointer pr-3">
                                    <span class="primary-color mr-3 bold-span">Total: </span>
                                    <span class="primary-color bold-span">&#8358;  {{totalAmount}}.00</span>
                                </div>
                            </div>
                          
                        </div>
                       
                    </div>
                </div>
            <div>
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
            showDropdown: false,
            rate: 1,
            isButtonDisabled: false,
            scheduleDateTime: null,
            showLoader: false,
            
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: [],
                search: { operator: "contains", ignoreCase: true },
            },
            invoiceNumber: 1,
            showCompanies: false,
            companies: [],
            companyId:"select company",
            products: [
                {
                    item: "Epump Go",
                    priceFormatted: '100,000.00',
                    priceAmount: 100000,
                    description: "A device which connects pumps & tanks in your station  to our web platform",
                    quantity: 1,
                    price: 100000,
                    amount: 0,
                    tax: "tax1",
                    taxAmount: '20,000.00',
                    taxPrice: 500
                }
            ],
            invoiceItems: [ ],
        }
    },
    mounted() {
        this.getCompanies()
        Array.from(document.getElementsByTagName('input')).forEach(input => {
            if(!Array.from(input.classList).includes('form-control')) {
                input.classList.add('form-control')
            }
        })
        document.querySelector('.dropdown__content').addEventListener('focusout', function(e){
            this.showDropdown = !this.showDropdown
        });
        $(window).click(function () { //Hide the menus if visible
             $('.dropdown__content').click(function (event) {event.stopPropagation();});
         }); 
        document.addEventListener("click", (evt) => {
            let flyoutEl = document.querySelector('dropdown__content'),
            targetEl = evt.target; // clicked element      
            do {
            if(targetEl == flyoutEl) {
                // This is a click inside, does nothing, just return.
                // document.getElementById("flyout-debug").textContent = "Clicked inside!";
                return;
            }
            // Go up the DOM
            targetEl = targetEl.parentNode;
            } while (targetEl);
            // This is a click outside.
           this.showDropdown = !this.showDropdown
        });
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



    },
    computed: {
        totalAmount() {
            return this.invoiceItems.reduce((acc,cur) => {
                return acc += ((cur.quantity * cur.price)) + cur.taxPrice
            }, 0)
        },
        subTotal() {
            return this.invoiceItems.reduce((acc,cur) => {
                return acc += ((cur.quantity * cur.price)) 
            }, 0)
        }
    },
    created() {

    },
    watch: {
        rate(val) {
            this.invoiceItems.forEach(el => {
                el.quantity = val
            })
        }
    },
    methods: {
        selectItem(product) {
            this.invoiceItems.push(product)
            this.showDropdown = !this.showDropdown
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
            this.showDropdown = !this.showDropdown
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