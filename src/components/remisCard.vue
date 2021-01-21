<template>
    <div class="p-1 remis-card-conainer cursor_hover">
        <img src="@/assets/img/Group 2575.png" class=""   /> 
        <div class="dash-card-container">
            <h3 class="text-black card-number-text ">{{cardNumber}}</h3>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RemisCard',
    props: {
        cardNumber: String
    }
}
</script>