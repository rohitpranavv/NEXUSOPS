from openai import OpenAI

from app.core import settings


class AIClient:
    def __init__(self) -> None:
        self._client = OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None

    def summarize_incident(self, text: str) -> tuple[str, str]:
        if self._client is None:
            return (
                f"Fallback summary: {text[:180].strip()}",
                "local-fallback",
            )

        response = self._client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {
                    "role": "system",
                    "content": "Summarize incidents into a crisp operator-facing status update in 2-3 sentences.",
                },
                {"role": "user", "content": text},
            ],
        )
        return response.output_text, "openai"
