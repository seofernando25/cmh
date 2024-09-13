<script lang="ts">
    import questionMark from "$lib/assets/icons/question.png";
    import bgShop from "$lib/assets/bg_shop.png";
    let day = 1;
    let maxDay = 10;
</script>

<img src={bgShop} alt="bg" class="bg" />
<div class="p-2 flex flex-col text-theme-brown relative h-full w-full">
    <div class="flex items-center gap-4">
        <button class="btn">
            <img src={questionMark} alt="help" class="h-6 w-6" />
        </button>
        <div class="text-3xl">
            Day {day}/{maxDay}
        </div>
        <div class="flex-1"></div>
        <button class="btn"> 🛒 </button>
        <button class="btn"> 📦 </button>
        <div class="text-2xl">
            <table>
                <tr>
                    <td class="pr-4">Money</td>
                    <td>123</td>
                </tr>
                <tr>
                    <td>AP</td>
                    <td>[] [] [] []</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="flex-1"></div>
    <div class="flex gap-4 text-theme-yellow">
        <button class="btn">🎃 </button>

        <button class="btn"> Work </button>
        <button class="btn"> Tidy-Up </button>
        <button class="btn"> Leave Shop </button>
        <div class="flex-1"></div>
        <button class="btn bg-theme-red"> Rest </button>
    </div>
</div>

<style>
    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .btn {
        box-sizing: border-box;
        padding: 1rem;
        background-color: var(--color-red);
        border-radius: 1rem;
        outline: 0.2rem solid var(--color-yellow);
        outline-offset: -0.2rem;
        transition: all 0.1s ease-in-out;
    }

    .btn:hover {
        transform: scale(1.1);
        background-color: lch(from var(--color-red) calc(l - 5) c h);
    }

    .btn:active {
        transform: scale(0.9);
    }
</style>
