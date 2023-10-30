export default async function handler(req, res) {
    try {

        res.status(200).json({ message: 'call api successfly', data:  []});
    }
    catch (err) {
        res.status(500).json({ message: err.message, data: [] });
    }
}