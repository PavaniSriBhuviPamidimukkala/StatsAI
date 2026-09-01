/**
 * STATS AI - Role-Based Assessment Question Bank
 * Questions contain internal topic & subtopic tags (hidden during exam).
 * Questions are dynamically loaded based on the registered officer's role.
 */

export const ROLE_QUESTION_BANKS = {
  "Senior Statistical Officer": [
    // --- PYTHON BASICS (2 Questions) ---
    {
      id: "SSO-PY-01",
      topic: "Python Basics",
      subtopic: "List comprehension & iterables",
      difficulty: "Beginner",
      question: "Which of the following Python expressions correctly creates a list of squared numbers from 1 to 5 using list comprehension?",
      options: [
        "[x**2 for x in range(1, 6)]",
        "[for x in range(1, 5) x**2]",
        "list(x^2 for x in 1..5)",
        "[x*2 while x in range(1, 6)]"
      ],
      correctIndex: 0,
      correctAnswer: "[x**2 for x in range(1, 6)]",
      explanation: "List comprehension syntax in Python is [expression for item in iterable]. range(1, 6) generates numbers 1 through 5, and ** is the exponentiation operator."
    },
    {
      id: "SSO-PY-02",
      topic: "Python Basics",
      subtopic: "Dictionary data structures",
      difficulty: "Beginner",
      question: "What will be the output of dict.get('state_code', 'NA') if 'state_code' does not exist as a key in the dictionary?",
      options: [
        "Throws KeyError exception",
        "Returns 'NA'",
        "Returns None",
        "Returns False"
      ],
      correctIndex: 1,
      correctAnswer: "Returns 'NA'",
      explanation: "The get() method of a Python dictionary takes an optional default value as the second argument, which is returned if the specified key is not found, avoiding a KeyError."
    },

    // --- DATA HANDLING (3 Questions) ---
    {
      id: "SSO-DH-01",
      topic: "Data Handling",
      subtopic: "Pandas operations",
      difficulty: "Intermediate",
      question: "Which Python library and method is commonly used to load tabular national survey data directly from a CSV file into memory?",
      options: [
        "numpy.read_array()",
        "pandas.read_csv()",
        "scipy.load_table()",
        "csv.parse_dataframe()"
      ],
      correctIndex: 1,
      correctAnswer: "pandas.read_csv()",
      explanation: "pandas.read_csv() is the standard industry and government function for reading CSV data into a Pandas DataFrame for data handling and manipulation."
    },
    {
      id: "SSO-DH-02",
      topic: "Data Handling",
      subtopic: "Missing-value handling",
      difficulty: "Intermediate",
      question: "In Pandas, which method is used to fill missing (NaN) survey values with the column mean or a specified constant?",
      options: [
        "df.fillna()",
        "df.dropna()",
        "df.replace_null()",
        "df.impute_empty()"
      ],
      correctIndex: 0,
      correctAnswer: "df.fillna()",
      explanation: "df.fillna(value) fills NA/NaN values using the specified method or value, which is essential for missing-value handling in survey data cleaning."
    },
    {
      id: "SSO-DH-03",
      topic: "Data Handling",
      subtopic: "Data cleaning & transformation",
      difficulty: "Intermediate",
      question: "When cleaning government administrative datasets, which Pandas command removes duplicated records based on specific identification columns?",
      options: [
        "df.drop_duplicates(subset=['id'])",
        "df.remove_clones(column='id')",
        "df.unique_rows(key='id')",
        "df.filter_distinct(['id'])"
      ],
      correctIndex: 0,
      correctAnswer: "df.drop_duplicates(subset=['id'])",
      explanation: "df.drop_duplicates(subset=['id']) filters out recurring duplicate entries, ensuring clean and reliable records for official reporting."
    },

    // --- DATA VISUALIZATION (2 Questions) ---
    {
      id: "SSO-DV-01",
      topic: "Data Visualization",
      subtopic: "Distribution & Boxplots",
      difficulty: "Intermediate",
      question: "Which chart type is best suited to display the five-number summary (minimum, Q1, median, Q3, maximum) and detect outliers across rural vs urban income groups?",
      options: [
        "Pie Chart",
        "Box and Whisker Plot",
        "Scatter Plot",
        "Donut Chart"
      ],
      correctIndex: 1,
      correctAnswer: "Box and Whisker Plot",
      explanation: "Box and whisker plots visually show the five-number summary and highlight potential outliers, making them the standard tool for distribution analysis."
    },
    {
      id: "SSO-DV-02",
      topic: "Data Visualization",
      subtopic: "Matplotlib & Seaborn styling",
      difficulty: "Beginner",
      question: "In Seaborn, which function is designed to plot the correlation matrix of multiple statistical indicators as an annotated color grid?",
      options: [
        "sns.heatmap()",
        "sns.gridplot()",
        "sns.corrplot()",
        "sns.matrixview()"
      ],
      correctIndex: 0,
      correctAnswer: "sns.heatmap()",
      explanation: "sns.heatmap() generates a 2D color-encoded matrix, ideal for visualizing correlation coefficients across demographic and economic variables."
    },

    // --- STATISTICS (3 Questions) ---
    {
      id: "SSO-ST-01",
      topic: "Statistics",
      subtopic: "Sampling theory & stratified design",
      difficulty: "Intermediate",
      question: "In nationwide socioeconomic surveys, why is Stratified Random Sampling preferred over Simple Random Sampling?",
      options: [
        "It requires no sampling frame",
        "It guarantees representation of distinct sub-populations (strata) and reduces variance",
        "It completely eliminates non-sampling errors",
        "It is always cheaper and takes zero planning"
      ],
      correctIndex: 1,
      correctAnswer: "It guarantees representation of distinct sub-populations (strata) and reduces variance",
      explanation: "Stratified random sampling divides the population into homogeneous subgroups (strata) ensuring minority or regional groups are represented and reducing sampling error."
    },
    {
      id: "SSO-ST-02",
      topic: "Statistics",
      subtopic: "Hypothesis testing & p-values",
      difficulty: "Advanced",
      question: "In hypothesis testing, if the calculated p-value is 0.02 and the significance level (alpha) is 0.05, what is the appropriate statistical conclusion?",
      options: [
        "Fail to reject the null hypothesis",
        "Reject the null hypothesis as the result is statistically significant",
        "Accept the null hypothesis with 98% certainty",
        "The sample size is insufficient to decide"
      ],
      correctIndex: 1,
      correctAnswer: "Reject the null hypothesis as the result is statistically significant",
      explanation: "When p-value < alpha (0.02 < 0.05), there is sufficient evidence against the null hypothesis to reject it in favor of the alternative hypothesis."
    },
    {
      id: "SSO-ST-03",
      topic: "Statistics",
      subtopic: "Measures of dispersion & variance",
      difficulty: "Beginner",
      question: "Which metric measures the relative dispersion of a dataset independent of its measurement units?",
      options: [
        "Standard Deviation",
        "Variance",
        "Coefficient of Variation (CV)",
        "Interquartile Range (IQR)"
      ],
      correctIndex: 2,
      correctAnswer: "Coefficient of Variation (CV)",
      explanation: "Coefficient of Variation (CV = standard deviation / mean * 100%) is dimensionless, allowing comparison of variability across surveys with different units."
    }
  ],

  "Data Analyst / Data Scientist": [
    // --- PYTHON BASICS (2) ---
    {
      id: "DA-PY-01",
      topic: "Python Basics",
      subtopic: "List comprehension & iterables",
      difficulty: "Beginner",
      question: "Which built-in Python function aggregates elements from two or more iterables into tuples?",
      options: ["zip()", "combine()", "map()", "aggregate()"],
      correctIndex: 0,
      correctAnswer: "zip()",
      explanation: "The zip() function pairs elements from multiple iterables index by index."
    },
    {
      id: "DA-PY-02",
      topic: "Python Basics",
      subtopic: "Functions and lambda expressions",
      difficulty: "Beginner",
      question: "Which keyword creates an anonymous single-expression function in Python?",
      options: ["def", "func", "lambda", "inline"],
      correctIndex: 2,
      correctAnswer: "lambda",
      explanation: "lambda is used to define anonymous inline functions in Python."
    },

    // --- DATA HANDLING (3) ---
    {
      id: "DA-DH-01",
      topic: "Data Handling",
      subtopic: "Pandas operations",
      difficulty: "Intermediate",
      question: "Which Pandas method allows grouping survey responses by State and calculating the mean household income?",
      options: [
        "df.cluster('State')['Income'].mean()",
        "df.groupby('State')['Income'].mean()",
        "df.aggregate_by('State', mean='Income')",
        "df.split('State').average('Income')"
      ],
      correctIndex: 1,
      correctAnswer: "df.groupby('State')['Income'].mean()",
      explanation: "df.groupby() implements the split-apply-combine strategy for data analysis in Pandas."
    },
    {
      id: "DA-DH-02",
      topic: "Data Handling",
      subtopic: "Missing-value handling",
      difficulty: "Intermediate",
      question: "Which Pandas method drops rows containing any null values across specified subset columns?",
      options: ["df.dropna(subset=['col1'])", "df.remove_empty()", "df.purge_nulls()", "df.filter_na()"],
      correctIndex: 0,
      correctAnswer: "df.dropna(subset=['col1'])",
      explanation: "df.dropna(subset=[...]) discards records with missing fields in specified target columns."
    },
    {
      id: "DA-DH-03",
      topic: "Data Handling",
      subtopic: "Data Manipulation",
      difficulty: "Intermediate",
      question: "Which function joins two DataFrames horizontally on a common key identifier?",
      options: ["pd.merge()", "pd.unite()", "pd.stack()", "pd.bind()"],
      correctIndex: 0,
      correctAnswer: "pd.merge()",
      explanation: "pd.merge() performs database-style SQL joins on DataFrames."
    },

    // --- AI/ML (3) ---
    {
      id: "DA-ML-01",
      topic: "AI/ML",
      subtopic: "Model evaluation & metrics",
      difficulty: "Intermediate",
      question: "In an imbalanced classification problem (e.g., fraud or survey anomalies), which metric is more informative than Accuracy?",
      options: ["F1-Score / PR-AUC", "Mean Squared Error", "R-Squared", "Kurtosis"],
      correctIndex: 0,
      correctAnswer: "F1-Score / PR-AUC",
      explanation: "F1-score balances precision and recall, crucial when rare minority classes exist."
    },
    {
      id: "DA-ML-02",
      topic: "AI/ML",
      subtopic: "Feature scaling & preprocessing",
      difficulty: "Intermediate",
      question: "Which Scikit-Learn transformer rescales numeric features so they have a mean of 0 and standard deviation of 1?",
      options: ["StandardScaler", "MinMaxScaler", "RobustScaler", "Normalizer"],
      correctIndex: 0,
      correctAnswer: "StandardScaler",
      explanation: "StandardScaler implements z-score standardization ((x - u) / s)."
    },
    {
      id: "DA-ML-03",
      topic: "AI/ML",
      subtopic: "Supervised algorithms",
      difficulty: "Intermediate",
      question: "Which tree ensemble algorithm trains decision trees sequentially, with each tree correcting errors made by prior trees?",
      options: ["Gradient Boosting / XGBoost", "Random Forest", "K-Means", "Principal Component Analysis"],
      correctIndex: 0,
      correctAnswer: "Gradient Boosting / XGBoost",
      explanation: "Gradient Boosting iteratively fits new models to the residual errors of preceding models."
    },

    // --- DATA VISUALIZATION (2) ---
    {
      id: "DA-DV-01",
      topic: "Data Visualization",
      subtopic: "Distribution & Boxplots",
      difficulty: "Intermediate",
      question: "Which visualization is best suited to display pairwise bivariate relationships and univariate distributions across multiple continuous features?",
      options: ["sns.pairplot()", "sns.barplot()", "plt.pie()", "plt.step()"],
      correctIndex: 0,
      correctAnswer: "sns.pairplot()",
      explanation: "sns.pairplot() plots a grid of scatter plots and histograms for all pairs of continuous variables."
    },
    {
      id: "DA-DV-02",
      topic: "Data Visualization",
      subtopic: "Matplotlib & Seaborn styling",
      difficulty: "Beginner",
      question: "In Matplotlib, which command configures high-DPI figure dimensions suitable for formal dashboard presentation?",
      options: ["plt.figure(figsize=(10, 6), dpi=300)", "plt.set_screen()", "plt.zoom(300)", "plt.render_size()"],
      correctIndex: 0,
      correctAnswer: "plt.figure(figsize=(10, 6), dpi=300)",
      explanation: "figsize and dpi parameters define physical dimensions and print resolution in Matplotlib."
    }
  ],

  "GIS & Spatial Analytics Specialist": [
    // --- GIS (3) ---
    {
      id: "GIS-01",
      topic: "GIS",
      subtopic: "Spatial joins & choropleths",
      difficulty: "Intermediate",
      question: "In GeoPandas, which function combines point survey locations with district polygon boundaries based on spatial intersection?",
      options: ["gpd.sjoin()", "gpd.overlay_polygon()", "gpd.spatial_concat()", "gpd.intersect_map()"],
      correctIndex: 0,
      correctAnswer: "gpd.sjoin()",
      explanation: "gpd.sjoin() performs spatial joins using geometric predicates like 'intersects' or 'within'."
    },
    {
      id: "GIS-02",
      topic: "GIS",
      subtopic: "Coordinate Reference Systems (CRS)",
      difficulty: "Intermediate",
      question: "Which EPSG code represents the standard WGS 84 geographic coordinate system used in global GPS mapping?",
      options: ["EPSG:4326", "EPSG:3857", "EPSG:7755", "EPSG:2154"],
      correctIndex: 0,
      correctAnswer: "EPSG:4326",
      explanation: "EPSG:4326 corresponds to the World Geodetic System 1984 (latitude/longitude in degrees)."
    },
    {
      id: "GIS-03",
      topic: "GIS",
      subtopic: "Thematic mapping",
      difficulty: "Beginner",
      question: "What type of map uses varying color intensities across administrative districts to show literacy or poverty rates?",
      options: ["Choropleth Map", "Topographic Map", "Isoline Map", "Orthophoto Map"],
      correctIndex: 0,
      correctAnswer: "Choropleth Map",
      explanation: "Choropleth maps shade predefined geographic areas according to a statistical metric."
    },

    // --- DATA HANDLING (3) ---
    {
      id: "GIS-DH-01",
      topic: "Data Handling",
      subtopic: "Pandas operations",
      difficulty: "Intermediate",
      question: "Which command converts longitude and latitude float columns into a GeoDataFrame Geometry column?",
      options: [
        "gpd.points_from_xy(df.lon, df.lat)",
        "gpd.create_coords(df)",
        "gpd.to_geo_array(df.lon, df.lat)",
        "df.make_spatial()"
      ],
      correctIndex: 0,
      correctAnswer: "gpd.points_from_xy(df.lon, df.lat)",
      explanation: "gpd.points_from_xy() creates Shapely Point objects from x (lon) and y (lat) arrays."
    },
    {
      id: "GIS-DH-02",
      topic: "Data Handling",
      subtopic: "Missing-value handling",
      difficulty: "Intermediate",
      question: "How are missing district codes usually handled before performing a spatial table join in Python?",
      options: ["Imputing by nearest spatial neighbor or geocoding address strings", "Deleting all map polygons", "Setting CRS to 0", "Renaming district names"],
      correctIndex: 0,
      correctAnswer: "Imputing by nearest spatial neighbor or geocoding address strings",
      explanation: "Geocoding and spatial lookup tables are used to fix missing geographic identifier codes."
    },
    {
      id: "GIS-DH-03",
      topic: "Data Handling",
      subtopic: "Data cleaning & transformation",
      difficulty: "Intermediate",
      question: "Which format is the modern open standard for storing vector GIS datasets alongside tabular attributes?",
      options: ["GeoPackage / GeoJSON", "BMP", "Plain Text", "RAW"],
      correctIndex: 0,
      correctAnswer: "GeoPackage / GeoJSON",
      explanation: "GeoJSON and GeoPackage (.gpkg) are open vector formats supported across modern geospatial tools."
    },

    // --- STATISTICS (2) ---
    {
      id: "GIS-ST-01",
      topic: "Statistics",
      subtopic: "Sampling theory & stratified design",
      difficulty: "Intermediate",
      question: "Which spatial statistical index tests for global spatial autocorrelation (clustering vs dispersion) across districts?",
      options: ["Moran's I", "Pearson's r", "Spearman's rho", "Cronbach's alpha"],
      correctIndex: 0,
      correctAnswer: "Moran's I",
      explanation: "Moran's I measures global spatial autocorrelation based on both feature locations and values."
    },
    {
      id: "GIS-ST-02",
      topic: "Statistics",
      subtopic: "Measures of dispersion & variance",
      difficulty: "Beginner",
      question: "What does a high positive Moran's I value indicate in regional survey data?",
      options: ["Spatial clustering of similar indicator values across neighboring districts", "Random spatial distribution", "Negative autocorrelation", "No data available"],
      correctIndex: 0,
      correctAnswer: "Spatial clustering of similar indicator values across neighboring districts",
      explanation: "A positive Moran's I indicates spatial clustering (high values near high values, or low near low)."
    },

    // --- DATA VISUALIZATION (2) ---
    {
      id: "GIS-DV-01",
      topic: "Data Visualization",
      subtopic: "Matplotlib & Seaborn styling",
      difficulty: "Intermediate",
      question: "Which Python package is widely used to create interactive Leaflet web maps inside web applications?",
      options: ["Folium", "Pygame", "Tkinter", "Curses"],
      correctIndex: 0,
      correctAnswer: "Folium",
      explanation: "Folium builds on Leaflet.js to generate interactive HTML web maps from Python."
    },
    {
      id: "GIS-DV-02",
      topic: "Data Visualization",
      subtopic: "Distribution & Boxplots",
      difficulty: "Beginner",
      question: "Which color scheme class (Sequential vs Diverging) should be used when mapping indicator rates that deviate from a national average baseline?",
      options: ["Diverging Colormap", "Sequential Single-Hue", "Categorical Random", "Greyscale only"],
      correctIndex: 0,
      correctAnswer: "Diverging Colormap",
      explanation: "Diverging colormaps highlight deviations above and below a critical central benchmark."
    }
  ],

  "Field Survey & Operations Officer": [
    // --- STATISTICS (3) ---
    {
      id: "FSO-ST-01",
      topic: "Statistics",
      subtopic: "Sampling theory & stratified design",
      difficulty: "Intermediate",
      question: "In NSS survey rounds, what constitutes the Primary Sampling Unit (PSU) in rural areas?",
      options: ["Census Village", "Individual Household", "Gram Panchayat Office", "District Headquarter"],
      correctIndex: 0,
      correctAnswer: "Census Village",
      explanation: "In official Indian rural sample surveys, census villages serve as First Stage Units (FSUs) / PSUs."
    },
    {
      id: "FSO-ST-02",
      topic: "Statistics",
      subtopic: "Hypothesis testing & p-values",
      difficulty: "Beginner",
      question: "What type of survey error is introduced by non-response, respondent recall bias, or investigator mistakes?",
      options: ["Non-Sampling Error", "Sampling Variance", "Standard Error", "Confidence Bound"],
      correctIndex: 0,
      correctAnswer: "Non-Sampling Error",
      explanation: "Non-sampling errors occur during data collection, reporting, and entry independent of sample selection."
    },
    {
      id: "FSO-ST-03",
      topic: "Statistics",
      subtopic: "Measures of dispersion & variance",
      difficulty: "Beginner",
      question: "How is household survey non-response rate calculated?",
      options: ["(Uncontacted or Refused Households / Total Sampled Households) × 100", "(Total Surveyors / Total Villages) × 100", "(Completed Surveys / Total District Population) × 100", "Mean income / Total HH"],
      correctIndex: 0,
      correctAnswer: "(Uncontacted or Refused Households / Total Sampled Households) × 100",
      explanation: "Non-response rate is the fraction of eligible sampled units that could not be surveyed."
    },

    // --- STATISTICAL COMPUTING (3) ---
    {
      id: "FSO-SC-01",
      topic: "Statistical Computing",
      subtopic: "Vectorized computations",
      difficulty: "Intermediate",
      question: "Which NumPy method calculates the weighted average of household consumption using sampling multipliers?",
      options: ["np.average(consumption, weights=multipliers)", "np.mean(consumption * multipliers)", "np.weighted_sum()", "np.sum_ratio()"],
      correctIndex: 0,
      correctAnswer: "np.average(consumption, weights=multipliers)",
      explanation: "np.average() supports a weights array to produce unbiased survey population estimates."
    },
    {
      id: "FSO-SC-02",
      topic: "Statistical Computing",
      subtopic: "Batch data validation",
      difficulty: "Beginner",
      question: "What logic check ensures that a recorded household member's age is consistent with their marital status?",
      options: ["Consistency & Range Validation Rules", "Cryptographic Hashing", "Database Indexing", "Sorting Alphabetically"],
      correctIndex: 0,
      correctAnswer: "Consistency & Range Validation Rules",
      explanation: "Range and cross-field consistency checks catch impossible field entries (e.g. age < 5 married)."
    },
    {
      id: "FSO-SC-03",
      topic: "Statistical Computing",
      subtopic: "Vectorized computations",
      difficulty: "Intermediate",
      question: "Which operation rapidly transforms multi-district raw text returns into standardized numeric arrays in Python?",
      options: ["Vectorized Type Casting with NumPy/Pandas", "Manual For-Loops", "Text File Copying", "Regular Expression Replace only"],
      correctIndex: 0,
      correctAnswer: "Vectorized Type Casting with NumPy/Pandas",
      explanation: "Vectorized casting (pd.to_numeric) provides high throughput processing for massive survey batches."
    },

    // --- DATA HANDLING (2) ---
    {
      id: "FSO-DH-01",
      topic: "Data Handling",
      subtopic: "Pandas operations",
      difficulty: "Intermediate",
      question: "Which command merges daily field investigator tablet syncs with the central server schema?",
      options: ["pd.concat([server_df, tablet_df], ignore_index=True)", "pd.overwrite_all()", "df.push_records()", "df.replace_table()"],
      correctIndex: 0,
      correctAnswer: "pd.concat([server_df, tablet_df], ignore_index=True)",
      explanation: "pd.concat appends incoming survey batches while generating clean incremental indices."
    },
    {
      id: "FSO-DH-02",
      topic: "Data Handling",
      subtopic: "Missing-value handling",
      difficulty: "Intermediate",
      question: "When an investigator leaves a survey field blank because a question is not applicable (skip logic), how is it encoded?",
      options: ["Special legitimate skip code (e.g. -99 or NA with metadata note)", "Zero always", "Random integer", "Deleting the person record"],
      correctIndex: 0,
      correctAnswer: "Special legitimate skip code (e.g. -99 or NA with metadata note)",
      explanation: "Standard statistical systems distinguish between 'Not Applicable' (skip logic) and 'Missing Data'."
    },

    // --- DATA VISUALIZATION (2) ---
    {
      id: "FSO-DV-01",
      topic: "Data Visualization",
      subtopic: "Distribution & Boxplots",
      difficulty: "Beginner",
      question: "Which chart tracks daily completed household interviews vs targeted quotas over a 30-day survey round?",
      options: ["Cumulative Line Chart / Burn-up Chart", "Pie Chart", "Polar Scatter Plot", "Radar Spider Chart"],
      correctIndex: 0,
      correctAnswer: "Cumulative Line Chart / Burn-up Chart",
      explanation: "Cumulative time series plots show daily pacing against total enumeration targets."
    },
    {
      id: "FSO-DV-02",
      topic: "Data Visualization",
      subtopic: "Matplotlib & Seaborn styling",
      difficulty: "Beginner",
      question: "Which visual format allows a Field Director to see survey progress across all 30 districts simultaneously?",
      options: ["Heatmap Progress Dashboard with color-coded completion %", "30 separate pie charts", "A single text file", "Audio readout"],
      correctIndex: 0,
      correctAnswer: "Heatmap Progress Dashboard with color-coded completion %",
      explanation: "A color-coded progress matrix gives supervisors instant oversight across geographic divisions."
    }
  ]
};

// Default question bank fallback

