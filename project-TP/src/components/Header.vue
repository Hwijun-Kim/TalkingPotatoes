<template>
    <header id="header_pj">
        <nav class="navbar">
            <div class="navbar_logo">
                <img src="/images/potato.png" height="70px" width="50px">
            </div>
            <ul class="navbar_menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">Total View</a></li>
                <li><a href="#">Summary</a></li>
            </ul>
            <ul class="navbar_icons">
                <li><i class="fa-solid fa-circle-plus" id="createItem" style="font-size: 30px;"></i></li>
                <li><i class="fa-solid fa-user" id="profile" style="font-size: 30px;"></i></li>
                <li><i class="fa-solid fa-right-from-bracket" id="logout" style="font-size: 30px;"></i></li>
                
                
            </ul>
        </nav>
    </header>
</template>

<style scoped>
.navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F0ECCA;
    padding: 10px 20px;
    width: 100vw;
}

a{
    text-decoration: none;
    color: black;
}

.navbar_menu{
    display: flex;
    list-style: none;
    padding-left: 0;

}

.navbar_menu li {
    padding: 8px 30px;
    color: black;
}

.navbar_menu li a:hover {
    color: red;
}
.navbar_icons{
    list-style: none;
    color: black;
    display: flex;

}

.navbar_icons li {
    padding: 8px 20px;
    size: 40px;
}

.fa-solid fa-eye{
    float: right;
}

/* #header_pj {width:100%; height:var(--height-top); z-index:50;} */
</style>