import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  let successMessage = ''
  let errorMessage = ''

  console.log('request')
  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json()

    console.log('body', body)

    const { name, attending, notes, slug } = body

    if (typeof name !== 'string' || name.length < 1) {
      errorMessage += 'Por favor ingrese su nombre. '
    }
    if (typeof attending !== 'string' || attending.length < 1) {
      errorMessage += 'Por favor confirme su asistencia. '
    }
    const hasErrors = errorMessage.length > 0

    if (!hasErrors) {
      try {
        const res = await fetch(
          `https://docs.google.com/forms/d/e/1FAIpQLSeq5ev4GlLobQLouotU8fMBsMZ8PJjADIofhAzZhGchdqTB-A/formResponse?submit=Submit?usp=pp_url&entry.2029760352=${name}&entry.751411364=${attending}&entry.266478440=${notes}&entry.1093102812=${slug}`
        )

        if (res.status == 200) {
          const resHtml = await res.text()

          if (
            resHtml.includes('no longer accepting responses') ||
            resHtml.includes('ya no acepta respuestas')
          ) {
            errorMessage = 'Lo sentimos. El formulario se encuentra cerrado.'
            return new Response(JSON.stringify({ message: errorMessage }), {
              status: 403,
            })
          }
          successMessage = 'Hemos recibido tu confirmación, gracias.'
          return new Response(JSON.stringify({ message: successMessage }), {
            status: 200,
          })
        }

        errorMessage =
          'Su mensaje no pudo ser enviado debido a un error interno.'
        return new Response(JSON.stringify({ message: errorMessage }), {
          status: 500,
        })
      } catch (err) {
        errorMessage = 'Se mensaje no pudo ser enviado debido a un error interno.'
        return new Response(JSON.stringify({ message: errorMessage }), {
          status: 500,
        })
      }
    }
  }

  errorMessage = 'Se mensaje no pudo ser enviado debido a un error en la petición.'
  return new Response(JSON.stringify({ message: errorMessage }), {
    status: 400,
  })
}
