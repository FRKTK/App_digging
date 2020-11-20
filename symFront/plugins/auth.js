export default async function ({ app }) {
    const auth = app.$auth;
    const url = 'http://localhost:4000/api/user/login'
    try {
        const { data } = await app.$axios.$post(url, null);
        auth.setToken('local', "Bearer " + data.access_token);
        setTimeout(async () => {
            auth.setStrategy('local');
            setTimeout(async () => {
                await auth.fetchUser();
            })
        });
    } catch (e) {
        console.log(e);
    }
}
