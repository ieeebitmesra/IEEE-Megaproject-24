import pandas as pd

# Load the CSV files
output_df = pd.read_csv("./output.csv")
classification_results_df = pd.read_csv("./classification_results.csv")

# Create an empty list to hold the results
results = []

# Process each entry in classification_results
for _, row in classification_results_df.iterrows():
    paper_id = row['File Name'].replace("Papers/", "").replace(".pdf", "")
    publishability = 1 if row['Prediction'] == 1 else 0

    if publishability == 1:
        # Find the corresponding entry in the output file
        matching_row = output_df[output_df['file_path'].str.contains(paper_id)]
        if not matching_row.empty:
            conference = matching_row.iloc[0]['conference']
            justification = matching_row.iloc[0]['justification']
        else:
            conference = "na"
            justification = "na"
    else:
        conference = "na"
        justification = "na"

    results.append([paper_id, publishability, conference, justification])

# Create a DataFrame for the results
results_df = pd.DataFrame(results, columns=["Paper ID", "Publishability", "Conference", "Justification"])

# Save the results to a CSV file
results_df.to_csv("Results.csv", index=False)

print("Results.csv generated successfully!")
