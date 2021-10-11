export async function getAmbulance() {
    const response = await fetch("http://absb.herokuapp.com/api/ambulance/")
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    const jsonData = await getAmbulance()
    res.status(200).json(jsonData)
}