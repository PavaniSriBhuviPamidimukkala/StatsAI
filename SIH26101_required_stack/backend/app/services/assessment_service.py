def calculate_skill_gaps(topic_scores: dict[str, float], threshold: float = 60.0) -> list[str]:
    return [topic for topic, score in topic_scores.items() if float(score) < threshold]
