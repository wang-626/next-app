async function test() {

    set2 = {
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: { "Bearer": "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" }
        }),
        method: "POST",
        body: JSON.stringify({
            query: `{query:{
            email
        }}`}),
    };

    try {
        const res3 = await fetch(
            "https://api.github.com/graphql",
            set2
        );
        const data2 = await res3.json();
        console.log(data2);
    } catch (e) {
        console.log(e);
    }
}
test()