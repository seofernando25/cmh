<script lang="ts">
    import questionMark from "$lib/assets/icons/question.png";
    let day = 1;
    let maxDay = 10;
</script>

<div
    class="p-2 gap-4 flex flex-col text-theme-yellow relative h-full w-full bg-theme-brown"
>
    <div class="flex items-center gap-4">
        <button class="btn">
            <img src={questionMark} alt="help" class="h-4 w-4" />
        </button>
        <div class="text-3xl">
            Day {day}/{maxDay}
        </div>
        <div class="flex-1"></div>
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

    <div class="flex justify-end">
        <div class="flex flex-col px-8 w-1/3 gap-4 text-theme-yellow">
            <button class="btn"> Chat </button>
            <button class="btn"> Actions </button>
            <button class="btn bg-theme-red"> Dress </button>
            <span class="self-center text-3xl">Mood 1/2</span>
        </div>
    </div>
</div>

<style>
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
