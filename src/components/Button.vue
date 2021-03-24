<template>
    <button @click="btnFunction" :class="btnClass"> {{btnText}} </button>
</template>

<script>
    export default {
        name:"Button",
        props: {
            btnFunction: Function,
            btnClass: String,
            btnText: String
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        display:inline-block;
        border-radius: 3px;
        font-size: 18px;
        margin: 10px;
        transition: 0.3s all;
        border: 0px;
        height: 40px;
    }
    .btn {
        &-blue {
            background: blue;
            color:white;
        }
        &-red {
            background: rgb(228, 79, 79);
            color:white;
        }
        &-green {
            background: green;
            color:white;
        }
        &-grey {
            background: grey;
            color: black;
        }
    }
    .btn-black {
        background: black;
        color: white;
        &:hover {
            background:white;
            color: black;
        }
    }
    .btn-white {
        background:white;
        color: black;
        border: 1px solid black;
        &:hover {
            background:black;
            color:white;
        }
    }

</style>